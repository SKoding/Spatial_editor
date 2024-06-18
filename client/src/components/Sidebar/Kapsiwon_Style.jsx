export const confirmedStyle = (feature) => {
    var confirmed = feature.properties.loss_year
    if (confirmed < 10) {
      return {
        fillColor: "#ffe6e6"
      }
    } else if (confirmed < 20) {
      return {
        fillColor: "#ffb6b6"
      }
    } else if (confirmed < 30) {
      return {
        fillColor: "#ff8686"
      }
    } 
};