let initialized = false;

let initPDF = () => {
  if(initialized){
    return true;
  } else {
    let viewer = document.getElementById('pdfObj');
    let pdfContainer = document.getElementById('pdfContainer');
    let url = document.getElementById('pdfurl').value;

    if(url.includes('pdf')){
      reloadPDF();
      initialized = true;
      return true;
    } else {
      pdfContainer.style.display = 'none';
      return false;
    }
  }
}

let closePDF = () => {
  let viewer = document.getElementById('pdfObj');
  let pdfContainer = document.getElementById('pdfContainer');
  let url = document.getElementById('pdfurl').value;
  let collapseBtn = document.getElementById('collapseOpn');

  pdfContainer.style.display = 'none';
  viewer.data = '';
  url = '';
  pdfContainer.style.display = 'none';
  collapseBtn.innerHTML = '&#9166;';
}

let reloadPDF = () => {
  let url = document.getElementById('pdfurl').value;
  let viewer = document.getElementById('pdfObj');
  console.log(url);
  viewer.data = url;
}

let collapsePDF = () => {
  let init = initPDF();
  let url = document.getElementById('pdfurl').value;
  let viewer = document.getElementById('pdfObj');
  let pdfContainer = document.getElementById('pdfContainer');
  let collapseBtn = document.getElementById('collapseOpn');

  if(init){
    if(pdfContainer.style.display === 'none'){
        pdfContainer.style.display = 'block';
        collapseBtn.innerHTML = 'Hide';
      } else {
      pdfContainer.style.display = 'none';
      collapseBtn.innerHTML = '&#9166;';
      }
  }
}

let vatMap = () => {
    let url = `https://map.vatsim.net`;
    window.open(url, '_blank');
}

let simbrief = (locator) => {
    let url = `https://www.simbrief.com/`;

    switch(locator){
    case 'new':
        url = `https://www.simbrief.com/system/dispatch.php?newflight=1`;
        break;
    case 'brief':
        url = `https://www.simbrief.com/system/briefing.php`;
        break;
    default:
        url = `https://www.simbrief.com/system/dispatch.php`;
        break;
    }

    window.open(url, '_blank');
}

let skyvect = (type) => {
    let url = `https://skyvector.com/`;
    switch(type){
      case 'hi':
        url = `https://skyvector.com/?ll=47.3,-122.1&chart=304&zoom=1`;
        break;
      case 'lo':
        url = `https://skyvector.com/?ll=47.3,-122.1&chart=302&zoom=1`;
        break;
      case 'vfr':
        url = `https://skyvector.com/?ll=47.3,-122.1&chart=301&zoom=1`;
          break;
      default:
        url = `https://skyvector.com/`;
    }
    window.open(url, '_blank');
}

let radar = () => {
    let url = `https://www.aviationweather.gov/radar`;
    window.open(url, '_blank');
}

let airNav = (_icao) => {
    let icao = _icao || 'ABCD';
    let err = document.getElementById('airerr');
    if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://www.airnav.com/airport/${icao}`;
    window.open(url, '_blank');
    err.innerHTML = '';
    } else {
    err.innerHTML = `No AirNav ${icao}`;
    console.log(`No AirNav ${icao}`);
    }
}

let metar = (_icao) => {
    let icao = _icao || 'ABCD';
    let err = document.getElementById('meterr');
    console.log(icao);
    if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://www.aviationweather.gov/adds/metars/index?submit=1&station_ids=${icao}&chk_metars=on&hoursStr=8&std_trans=translated`;
    window.open(url, '_blank');
    err.innerHTML = '';
    } else {
    err.innerHTML = `No Metar ${icao}`;
    console.log(`No Metar ${icao}`);
    }
}

let datis = (_icao) => {
    let icao = _icao || 'ABCD';
    let err = document.getElementById('datiserr');
    console.log(icao);
    if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://datis.clowd.io/${icao}`;
    window.open(url, '_blank');
    err.innerHTML = '';
    } else {
    err.innerHTML = `No Metar ${icao}`;
    console.log(`No Metar ${icao}`);
    }
}

let skyVector = (_icao) => {
    let icao = _icao || 'ABCD';
    let err = document.getElementById('skyerr');
    console.log(icao);
    if (icao !== '' || icao !== undefined || icao !== 'ABCD') {
    let url = `https://skyvector.com/airport/${icao}`;
    window.open(url, '_blank');
    err.innerHTML = '';
    } else {
    err.innerHTML = `No Metar ${icao}`;
    console.log(`No SkyVector ${icao}`);
    }
}

let clearAll = () => {
    let meterr = document.getElementById('meterr');
    let airerr = document.getElementById('airerr');
    let skyerr = document.getElementById('skyerr');
    let text = document.getElementById('textInput');

    airerr.innerHTML = '';
    skyerr.innerHTML = '';
    meterr.innerHTML = '';
    text.innerHTML = '';
}

let expandList = (_icaoText) => {
    let icaoText = _icaoText || 'ABCDList';
    let icaoList = [];

    if (icaoText !== 'ABCDList') {
    icaoList = icaoText.split(' ');
    return icaoList
    }
}

let openService = (_service) => {
    clearAll();
    let meterr = document.getElementById('meterr');
    let airerr = document.getElementById('airerr');
    let skyerr = document.getElementById('skyerr');
    let datiserr = document.getElementById('datiserr');
    let metarList = airNavList = skyVectorList = datisList = document.getElementById('textInput').value || undefined;
    let icaoList = [];
    let service = _service || 'error';

    switch (service) {
    case 'metar':
        if (metarList) {
        icaoList = expandList(metarList);
        icaoList.forEach(icao => {
            metar(icao);
        });
        } else {
        meterr.innerHTML = `metar empty | ${metarList} | ${service}`;
        }
        break;
    case 'datis':
        if (datisList) {
        icaoList = expandList(datisList);
        icaoList.forEach(icao => {
            datis(icao);
        });
        } else {
        datiserr.innerHTML = `datiserr empty | ${datiserr} | ${service}`;
        }
        break;
    case 'airnav':
        if (airNavList) {
        icaoList = expandList(airNavList);
        icaoList.forEach(icao => {
            console.log(icao);
            airNav(icao);
        });
        } else {
        airerr.innerHTML = `airNav empty | ${airNavList} | ${service}`;
        }
        break;
    case 'skyvector':
        if (skyVectorList) {
        icaoList = expandList(skyVectorList);
        icaoList.forEach(icao => {
            skyVector(icao);
        });
        } else {
        skyerr.innerHTML = `skyVector empty | ${skyVectorList} | ${service}`;
        }
        break;
    default:
        console.log(`open default ${service} | ${icao}`);
    }
}