
fetch("https://api.thecatapi.com/v1/breeds")
.then(getResponse)
.then(getBreeds)
.catch(catchErrors);

fetch(`${API}${KEY}&limit=30`)
.then(getResponse)
.then(getImages)
.catch(catchErrors);

breedSelector.addEventListener("change", (event) => {
  const breedID = event.target.value;
  let imageURL = `${API}${KEY}&breed_ids=${breedID}&limit=30`;
  
  if (event.target.value === "rndm") {
    imageURL = `${API}${KEY}&limit=30`;
  }

  clearGrid();

  fetch(imageURL)
    .then(getResponse)
    .then(getImages)
    .catch(catchErrors);
});