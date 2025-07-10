import https from 'https';
import LXD_CONFIG from '../config/lxd.js';

class LXDClient {
  constructor() {
    this.agent = new https.Agent({
      cert: LXD_CONFIG.cert,
      key: LXD_CONFIG.key,
      rejectUnauthorized: LXD_CONFIG.rejectUnauthorized,
      keepAlive: true
    });
  }

  async request(endpoint, method = 'GET', data = null, project = null) {
    let url = `${LXD_CONFIG.baseUrl}${endpoint}`;
    
    // Add project parameter
    if (project && project !== 'default') {
      const separator = endpoint.includes('?') ? '&' : '?';
      url += `${separator}project=${project}`;
    }
    
    return new Promise((resolve, reject) => {
      const options = {
        method,
        agent: this.agent,
        timeout: LXD_CONFIG.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = https.request(url, options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(body);
            resolve(jsonData);
          } catch (error) {
            reject(new Error(`Invalid JSON response: ${error.message}`));
          }
        });
      });

      req.on('error', reject);
      req.on('timeout', () => reject(new Error('Request timeout')));

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  // Basic LXD API methods with project support
  async getInstances(project = 'default') {
    if (project === 'all') {
      return this.getAllProjectsData('instances');
    }
    
    // Get instance list
    const instanceList = await this.request('/instances', 'GET', null, project);
    const instances = instanceList.metadata || [];
    
    // Get detailed info for each instance
    const detailedInstances = await Promise.all(
      instances.map(async (instancePath) => {
        try {
          const instanceName = instancePath.split('/').pop().split('?')[0];
          const [state, config] = await Promise.all([
            this.request(`/instances/${instanceName}/state`, 'GET', null, project),
            this.request(`/instances/${instanceName}`, 'GET', null, project)
          ]);
          
          return {
            name: instanceName,
            path: instancePath,
            state: state.metadata,
            config: config.metadata,
            project: project
          };
        } catch (error) {
          console.warn(`Failed to fetch details for instance ${instancePath}:`, error.message);
          const instanceName = instancePath.split('/').pop().split('?')[0];
          return {
            name: instanceName,
            path: instancePath,
            state: null,
            config: null,
            project: project
          };
        }
      })
    );
    
    return {
      metadata: detailedInstances,
      projects: instanceList.projects
    };
  }

  async getClusterMembers() {
    // Cluster members are global, not project-specific
    return this.request('/cluster/members');
  }

  async getNetworks(project = 'default') {
    if (project === 'all') {
      return this.getAllProjectsData('networks');
    }
    return this.request('/networks', 'GET', null, project);
  }

  async getStoragePools(project = 'default') {
    if (project === 'all') {
      return this.getAllProjectsData('storage-pools');
    }
    return this.request('/storage-pools', 'GET', null, project);
  }

  async getOperations(project = 'default') {
    if (project === 'all') {
      return this.getAllProjectsData('operations');
    }
    return this.request('/operations', 'GET', null, project);
  }

  async getEvents(project = 'default') {
    if (project === 'all') {
      return this.getAllProjectsData('events');
    }
    return this.request('/events', 'GET', null, project);
  }

  async getProjects() {
    return this.request('/projects');
  }

  // Get data from all projects and aggregate
  async getAllProjectsData(endpoint) {
    try {
      const projectsResult = await this.getProjects();
      const projects = projectsResult.metadata || [];
      
      const allResults = await Promise.all(
        projects.map(async (projectPath) => {
          const projectName = projectPath.split('/').pop();
          try {
            const result = await this.request(`/${endpoint}`, 'GET', null, projectName);
            return {
              project: projectName,
              data: result.metadata || []
            };
          } catch (error) {
            console.warn(`Failed to fetch ${endpoint} for project ${projectName}:`, error.message);
            return { project: projectName, data: [] };
          }
        })
      );

      // Aggregate all project data
      const aggregatedData = allResults.reduce((acc, result) => {
        const dataArray = Array.isArray(result.data) ? result.data : [];
        return acc.concat(dataArray.map(item => ({
          ...item,
          project: result.project
        })));
      }, []);

      return {
        metadata: aggregatedData,
        projects: allResults
      };
    } catch (error) {
      console.error(`Error fetching all projects data for ${endpoint}:`, error);
      throw error;
    }
  }
}

export default new LXDClient();