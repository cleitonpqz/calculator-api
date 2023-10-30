module.exports = async (globalConfig) => {
  await __knex.destroy();
  await __container.stop();
};
