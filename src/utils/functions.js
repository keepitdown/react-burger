function checkApiResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
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

export { checkApiResponse, addProperty, groupByType, changePageTitle };