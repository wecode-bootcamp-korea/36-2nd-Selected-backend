const { AppDataSource } = require("../models/dataSource");

const getResumes = async () => {
    try {
        return await AppDataSource.query(
        `SELECT
            u.id,
            u.name,
            u.email
            FROM users u`
      );
    } catch (err) {
      const error = new Error("INVALID_DATA_INPUT");
      error.statusCode = 500;
      throw error;
    };
    }
    
  module.exports = { 
    getResumes
  };