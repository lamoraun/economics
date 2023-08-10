async function configureManager() {
  const manager = new EconomicManager();
  await manager.getData();
  manager.initIncome();
  manager.countBaseIncome();
  manager.countTradeIncome();
  manager.countFullIncome();
}

configureManager();
console.log(manager);