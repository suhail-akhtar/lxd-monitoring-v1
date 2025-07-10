import express from 'express';
import lxdClient from '../services/lxdClient.js';
import dataMapper from '../services/dataMapper.js';

const router = express.Router();

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'API is working', timestamp: new Date().toISOString() });
});

// Overview/Dashboard data
router.get('/overview', async (req, res) => {
  try {
    const project = req.query.project || 'all';
    
    const [instances, clusterMembers, networks, storagePools, operations] = await Promise.all([
      lxdClient.getInstances(project),
      lxdClient.getClusterMembers(),
      lxdClient.getNetworks(project),
      lxdClient.getStoragePools(project),
      lxdClient.getOperations(project)
    ]);

    const rawData = {
      instances: instances.metadata || [],
      clusterMembers: clusterMembers.metadata || [],
      networks: networks.metadata || [],
      storagePools: storagePools.metadata || [],
      operations: operations.metadata || [],
      projects: instances.projects || null
    };

    const processedData = dataMapper.mapOverviewData(rawData, project === 'all');
    res.json(processedData);
  } catch (error) {
    console.error('Overview error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Instances
router.get('/instances', async (req, res) => {
  try {
    const project = req.query.project || 'all';
    const result = await lxdClient.getInstances(project);
    const processedData = dataMapper.mapInstances(result.metadata || []);
    res.json(processedData);
  } catch (error) {
    console.error('Instances error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cluster nodes
router.get('/cluster-nodes', async (req, res) => {
  try {
    const result = await lxdClient.getClusterMembers();
    const processedData = dataMapper.mapClusterMembers(result.metadata || []);
    res.json(processedData);
  } catch (error) {
    console.error('Cluster nodes error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Networks
router.get('/networks', async (req, res) => {
  try {
    const project = req.query.project || 'all';
    const result = await lxdClient.getNetworks(project);
    const processedData = dataMapper.mapNetworks(result.metadata || []);
    res.json(processedData);
  } catch (error) {
    console.error('Networks error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Storage
router.get('/storage', async (req, res) => {
  try {
    const project = req.query.project || 'all';
    const result = await lxdClient.getStoragePools(project);
    const processedData = dataMapper.mapStoragePools(result.metadata || []);
    res.json(processedData);
  } catch (error) {
    console.error('Storage error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Operations
router.get('/operations', async (req, res) => {
  try {
    const project = req.query.project || 'all';
    const result = await lxdClient.getOperations(project);
    const processedData = dataMapper.mapOperations(result.metadata || []);
    res.json(processedData);
  } catch (error) {
    console.error('Operations error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all projects list
router.get('/projects-list', async (req, res) => {
  try {
    const result = await lxdClient.getProjects();
    const projects = (result.metadata || []).map(path => ({
      name: path.split('/').pop(),
      path
    }));
    res.json(projects);
  } catch (error) {
    console.error('Projects list error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Events
router.get('/events', async (req, res) => {
  try {
    const result = await lxdClient.getEvents();
    res.json(result.metadata || []);
  } catch (error) {
    console.error('Events error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const result = await lxdClient.getProjects();
    res.json(result.metadata || []);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;