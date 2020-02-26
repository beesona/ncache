const urlData: string = JSON.stringify({someData: 'data', someOtherData: 'data2'});

export default function request(url) {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        urlData
          ? resolve(urlData)
          : reject({
              error: 'URL DATA NOT FOUND',
            }),
      );
    });
  }