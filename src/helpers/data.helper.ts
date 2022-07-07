export const dataURItoBlob = (dataURI: string) => {
  try {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeType = dataURI.match(/:([a-z/-]+);/)?.[1];

    // byte列をBlobに変換する
    let buffer = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: mimeType });
  } catch (error) {
    console.warn(error);
    return null;
  }
};

export const readBlob = (blob: Blob): Promise<string> => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort();
      reject();
    };

    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };

    fileReader.readAsText(blob);
  });
};

export const readFileAsDataUrl = (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject();
    };
    reader.onload = (loadEvent) => {
      if (loadEvent.target) {
        resolve(loadEvent.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  });
};

export const blobToJson = async <T>(blob: unknown) => {
  if (blob instanceof Blob) {
    try {
      const blobText = await readBlob(blob);
      return JSON.parse(blobText) as T;
    } catch (e) {
      console.warn(e);
    }
  } else {
    console.warn("not blob data");
  }
};
