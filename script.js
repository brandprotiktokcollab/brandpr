const clientKey = 'awwffz1k3kqg1rak';
const clientSecret = '1d0960c9f380d1f78f5952d9087892e4';

// List of TikTok user IDs for your ambassadors
const userIds = ['jasminxiex', 'queen.hari', 'heyitzoej', 'heartdaisy_', 'annxshka', 'rebecca.botha'];

// Function to fetch data for a TikTok user ID
function fetchUserData(userId) {
  const url = `https://api.tiktok.com/aweme/v1/user/follower/list?user_id=${userId}&count=10&max_time=0&aid=1233&app_name=musical_ly&version=16&device_type=iphone&os_version=9.0.1&device_platform=iphone&device_id=123456789`;

  return fetch(url, { headers: { 'X-Tt-Token': clientSecret, 'X-Tt-Openid': clientKey } })
    .then(response => response.json())
    .then(data => {
      return data.users.map(user => {
        return {
          name: user.nickname,
          profilePicture: user.avatar_thumb.url_list[0],
          signature: user.signature,
        };
      });
    });
}

// Function to display data for a list of ambassadors
function displayAmbassadors(ambassadors) {
  const container = document.getElementById('ambassadors-container');
  ambassadors.forEach(ambassador => {
    const div = document.createElement('div');
    div.innerHTML = `<img src="${ambassador.profilePicture}" alt="${ambassador.name}">
      <h4>${ambassador.name}</h4>
      <p>${ambassador.signature}</p>`;
    container.appendChild(div);
  });
}

// Fetch data for each TikTok user ID and display it on the page
const promises = userIds.map(userId => fetchUserData(userId));
Promise.all(promises)
  .then(data => {
    data.forEach(ambassadors => {
      displayAmbassadors(ambassadors);
    });
  })
  .catch(error => console.error(error));
