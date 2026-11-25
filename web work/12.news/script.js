
async function getNews() {
    let news = document.getElementById("news");

    news.innerHTML = "Loading news...";

    try {
        let feed = "https://feeds.bbci.co.uk/news/rss.xml";

        let url = "https://api.rss2json.com/v1/api.json?rss_url="
                  + encodeURIComponent(feed);

        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error");
        }

        let data = await response.json();

        news.innerHTML = "";

        if (!data.items || data.items.length == 0) {
            news.innerHTML = "No news available";
            return;
        }

        data.items.forEach(article => {
            let image = article.thumbnail || "";

            news.innerHTML += `
                <div class="article">
                    ${image ? `<img src="${image}" alt="News image">` : ""}
                    <h3>${article.title}</h3>
                    <p>${article.description || "No description available"}</p>
                    <p>Source: BBC News</p>
                    <p>Date: ${new Date(article.pubDate).toLocaleDateString()}</p>
                </div>
            `;
        });

    } catch (error) {
        news.innerHTML = "Unable to load news!";
    }
}

getNews();
