const addManhwa = async (title, email, data) => {
  return await $.ajax({
    url: `${import.meta.env.VITE_API_URL}add_manhwa`,
    type: "POST",
    contentType: 'application/json',
    crossDomain: true,
    data: JSON.stringify({
      url: title,
      email: email,
      ...data
    }),
    dataType: 'json',
    processData: false,
    type: 'POST',
  }).then((res) => {
    console.log({ res });
    return res;
  }).catch(err => {
    console.log({ err });
    return err;
  });
}
const removeManhwa = async (title, email) => {
  return await $.get(`${import.meta.env.VITE_API_URL}remove_manhwa?url=${title}&email=${email}`).then((res) => { }).catch(err => {
    return err;
  });
}
const addManhwaHistory = async (title, email) => {
  return await $.get(`${import.meta.env.VITE_API_URL}add_history?url=${title}&email=${email}`).then((res) => {
    console.log(res);
    return res;
  }).catch(err => {
    return err;
  });
}
const removeManhwaHistory = async (title, email) => {
  return await $.get(`${import.meta.env.VITE_API_URL}remove_history?url=${title}&email=${email}`).then((res) => {
    return res;
  }).catch(err => {
    return err;
  });
}

const getManhwaHistory = async (title, email) => {
  return await $.get(`${import.meta.env.VITE_API_URL}get_history`).then((res) => {
    return res;
  }).catch(err => {
    return err;
  });
}

const readm = async (path) => {
  if (path === "/" || !path.includes("/manga/")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else if (path.includes("/manga/")) {
    if (!path.includes("/all-pages")) {
      var url = window.location.href;
      var chapter = "";
    } else {
      var url = window.location.origin;
      var chapter = path.split("/")[3];
      url = `${url}${path.split("/").splice(0, 3).join("/")}`;
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res.html));
      const name = html.find("h1.page-title").html();
      const img = `${window.location.origin}${html.find("img.series-profile-thumb").attr("src")}`;
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      return data;
    });
  }
}


const asuracomic = async (path) => {
  if (path === "/" || !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    var url = window.location.href.split('/').splice(0, 5).join('/');
    var chapterString = path.split('/');
    chapter = chapterString[chapterString.length - 1];

    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("span.text-xl").html();
      const img = html.find("img.rounded").attr("src");
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      return data;
    });
  }
}

const reaper = async (path) => {
  // Root
  if (path === "/" || !path.includes("/series/") && !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    // Capitulos
    if (!path.includes("chapter")) {
      var url = window.location.href;
      var chapter = "";
    } else {
      // Página do capitulo
      var url = window.location.origin;
      url = `${url}${path.split("/").splice(0, 3).join("/")}`;
      var chapter = path.split('/')
      chapter = chapter[chapter.length - 1].split('-')[1];
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("div.flex > h1.text-xl").html().replace(/[\n\r]/g, '');
      var img = html.find("div.bg-background > img").attr("src")
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      return data;
    });
  }
}

const kakalot = async (path) => {
  if (path === "/" || !path.includes("/manga") && !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    if (!path.includes("chapter")) {
      var url = window.location.href;
      var chapter = "";
    } else {
      var url = window.location.origin;
      url = `${url}${path.split("/").splice(0, 2).join("/")}`;
      chapter = path.replace(/[^0-9]/g, "");
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("div.story-info-right h1").html();
      const img = html.find("span.info-image img.img-loading").attr("src");
      console.log({ img });
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      // console.log(data);
      return data;
    });
  }
}

const mangasee = async (path) => {
  if (path === "/" || !path.includes("/manga") && !path.includes("read-online")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    var url = window.location.origin;
    var title = path.split("/");
    chapter = title[2].split("-").pop().replace(".html", "");
    title = title[2].split("-");
    title = title.splice(0, title.length - 2).join("-");
    url = `${url}/manga/${title}`;

    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find(".Box h1").html();
      const img = html.find(".BoxBody > div > div > img").attr("src");

      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      console.log({ data })
      return data;
    });
  }
}

const galaxy = async (path) => {
  if (path === "/" || path.includes("series")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    var url = window.location.origin;
    var title = path.split("/")[1].split("-");
    chapter = title[title.length - 1];
    title = title.slice(0, title.length - 2).join("-");
    url = `${url}/manga/${title}/`;

    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("h1.entry-title").html();
      const img = html.find(".info-left-margin > div > img").attr("src");
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      return data;
    });
  }
}


const manhwaclan = async (path) => {
  if (path === "/" || !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    var url = window.location.origin;
    var data = path.split("/");
    var title = data[2];
    chapter = data[3].split('-')[1];
    url = `${url}/manga/${title}/`;

    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("div.post-title > h1").html();
      const img = html.find(".summary_image img").attr("src");
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      return data;
    });
  }
}

const mangaDex = async (path) => {
  if (path === "/" || !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {

    const url = document.querySelector('.reader--header a').href;
    const chapter = document.querySelector(".reader--meta.chapter").innerHTML.replace(/\D/g, '');

    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const img = html.find("img").attr("src");
      const name = html.find("p").html();

      const data = {
        chapter,
        name,
        img,
        card: true,
      };

      console.log({
        img: html.find("img"),
        name: html.find("p"),
        html
      });
      return data;
    });
  }
}

const nightScans = async (path) => {
  const url = document.querySelector('div.headpost > div > a').href;
  const chapter = $("#chapter option:selected").html().replace(/\D/g, '');

  return await $.ajax(url).then((res) => {
    const html = $($.parseHTML(res));
    const img = html.find("div.thumb > noscript > img").attr("src");
    const name = html.find(".entry-title").html();

    const data = {
      chapter,
      name,
      img,
      card: true,
    };
    return data;
  });
}

const getInfo = {
  0: readm,
  1: asuracomic,
  2: reaper,
  3: kakalot,
  4: kakalot,
  5: mangasee,
  6: galaxy,
  7: manhwaclan,
  8: mangaDex,
  9: nightScans
}

const getManhwaInfo = async (url) => {
  const origin = window.location.hostname;
  const type = [
    "readm",
    "asuracomic",
    "reaperscans",
    "mangakakalot",
    "readmanganato",
    "mangasee123",
    "mangagalaxy",
    "manhwaclan",
    "mangadex",
    "nightsup"
  ];

  const option = type.filter((item, index) => {
    if (origin.includes(item)) {
      return item;
    } else
      return false
  })[0];

  const path = window.location.pathname;
  const index = type.indexOf(option);
  return await getInfo[index](path);
}
