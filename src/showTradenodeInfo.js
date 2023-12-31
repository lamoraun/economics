function renderPieChart(tradenode, tradeCountriesList) {
  const chart = new CanvasJS.Chart('countriesChart', {
    width: document.querySelector('.tradenode-window').offsetWidth,
    height: 300,
    backgroundColor: 'transparent',
    data: [
      {
        type: 'pie',
        startAngle: -80,
        radius: window.innerWidth / 10,
        indexLabelFontSize: 20,
        indexLabelFontColor: '#e1e1e1',
        indexLabelFontFamily: 'Kingthings',
        indexLabel: '{label}',
        outerWidth: 100,
        explodeOnClick: false,
        toolTipContent: '<b>{label}:</b> #percent%',
        dataPoints: Object.values(tradeCountriesList)
          .map((country) => {
            const dataPoint = {
              y: tradenode.countries.find((c) => c.id == country.id).influence,
              color: country.color,
              label: country.name,
              click: showCountryInfo.bind(null, country),
              mousemove: function () {
                document
                  .querySelectorAll(
                    '.canvasjs-chart-container, .canvasjs-chart-container *'
                  )
                  .forEach((canvas) => (canvas.style.cursor = 'pointer'));
              },
            };
            return dataPoint;
          })
          .sort((a, b) => a.y - b.y),
      },
    ],
  });
  chart.render();
}

function buildTradenodeWindow(tradenode, countriesList) {
  const tradenodeWindow = document.createElement('div');
  tradenodeWindow.classList.add('window', 'tradenode-window');

  const closeButton = document.createElement('button');
  closeButton.classList.add('window__close', 'tradenode-window__close');
  closeButton.addEventListener('click', () => {
    tradenodeWindow.remove();
  });
  tradenodeWindow.append(closeButton);

  const tradenodeName = document.createElement('div');
  tradenodeName.classList.add('window__name');
  const tradenodeNameText = document.createElement('h2');
  tradenodeNameText.textContent = tradenode.name;
  tradenodeName.append(tradenodeNameText);
  tradenodeWindow.append(tradenodeName);

  const tradenodeIncome = document.createElement('div');
  tradenodeIncome.classList.add(
    'window__parameter',
    'tradenode-window__income'
  );
  const tradenodeIncomeIcon = document.createElement('div');
  tradenodeIncomeIcon.classList.add(
    'window__parameter-icon',
    'tradenode-window__income-icon'
  );
  const tradenodeIncomeValue = document.createElement('span');
  tradenodeIncomeValue.classList.add(
    'window__parameter-value',
    'tradenode-window__income-value'
  );
  tradenodeIncomeValue.innerText = 'Доход области: ' + tradenode.income;
  tradenodeIncome.title =
    'Общий доход с торгового узла, распределяющийся между влиятельными странами (талетеев в сезон)';
  tradenodeIncome.append(tradenodeIncomeIcon, tradenodeIncomeValue);
  tradenodeWindow.append(tradenodeIncome);

  const countriesChart = document.createElement('div');
  countriesChart.classList.add('tradenode-window__countries');
  countriesChart.id = 'countriesChart';
  tradenodeWindow.append(countriesChart);
  document.body.append(tradenodeWindow);
  renderPieChart(
    tradenode,
    countriesList.filter((c) =>
      tradenode.countries.map((co) => co.id).includes(c.id)
    )
  );
}

function showTradenodeInfo(event, economicManager) {
  document.querySelectorAll('.tradenode-window').forEach((tradenodeWindow) => {
    tradenodeWindow.remove();
  });
  const tradenodeId = event.target.id;
  const tradenode = economicManager.tradenodes.list.find(
    (t) => t.id == tradenodeId
  );
  buildTradenodeWindow(tradenode, economicManager.countries.list);
}
