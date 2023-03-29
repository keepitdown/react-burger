function checkApiResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}: ${response.statusText}`);
}

function addProperty(ingredientsData, propertyName, initialValue) {
  return ingredientsData.map(item => ({ ...item, [propertyName]: initialValue }))
}

function groupByType(dataArray) {
  return dataArray.reduce((processedData, currentItem) => {
    const itemType = currentItem.type;
    const updatedGroup = itemType in processedData
      ? [...processedData[itemType], currentItem]
      : [currentItem];
    return { ...processedData, [itemType]: updatedGroup }
  }, {})
}

function changePageTitle(title) {
  document.title = `Stellar Burgers | ${title}`;
}

function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${value};max-age=${maxAge};samesite=strict`;
}

function getCookie(name) {
  const cookieString = document.cookie.split(';').find(cookieString => cookieString.trim().startsWith(name));
  return cookieString?.split('=')[1];
}

function removeCookie(name) {
  setCookie(name, '', 0);
}

//2592000

//1200

export { checkApiResponse, addProperty, groupByType, changePageTitle, setCookie, getCookie, removeCookie };