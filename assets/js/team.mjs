"use strict";
// import staff module
import { staff } from './staff.mjs';

// forEach loop to build the cards
staff.forEach(profile => {
  document.querySelector('.teamContainer').innerHTML +=
    `<div class="card">
      <div class="line"></div>
      <div class="profile">
        <img src="${profile.img}" alt="${profile.name}">
      </div>
      <div class="content">
        <div class="info">
          <h2>${profile.name}</h2>
          <p>${profile.title}</p>
          <p>${profile.bio}</p>
        </div>
      </div>
  </div>`;
});