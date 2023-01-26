const addManhwa = async (title, email, data) => {
  return await $.ajax({
    url: `https://manhwa-tracker.onrender.com/add_manhwa`,
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
  return await $.get(`https://manhwa-tracker.onrender.com/remove_manhwa?url=${title}&email=${email}`).then((res) => { }).catch(err => {
    return err;
  });
}

const addManhwaHistory = async (title, email) => {
  return await $.get(`https://manhwa-tracker.onrender.com/add_history?url=${title}&email=${email}`).then((res) => {
    console.log(res);
    return res;
  }).catch(err => {
    return err;
  });
}

const removeManhwaHistory = async (title, email) => {
  return await $.get(`https://manhwa-tracker.onrender.com/remove_history?url=${title}&email=${email}`).then((res) => {
    return res;
  }).catch(err => {
    return err;
  });
}

const getManhwaHistory = async (title, email) => {
  return await $.get(`https://manhwa-tracker.onrender.com/get_history`).then((res) => {
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

const asura = async (path) => {
  console.log(path.replace(/[^0-9]/g, ""));
  if (path === "/" || !path.includes("/manga/") && !path.includes("chapter")) {
    return {
      chapter: "",
      name: "",
      img: "",
      card: false,
    }
  } else {
    if (path.length <= 1) {
      var url = window.location.href;
      var chapter = "";
    } else {
      var url = $("div.allc a").attr("href");
      chapter = path.replace(/[^0-9]/g, "");
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("h1.entry-title").html();
      const img = html.find("div.thumb > img.wp-post-image").attr("src");
      const data = {
        chapter: chapter,
        name: name,
        img: img,
        card: true,
      };
      console.log(data);
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
      chapter = chapter[chapter.length - 1].split('-')[2];
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("div.flex h1").html().replace(/[\n\r]/g, '');
      var img = html.find("img.h-full").attr("src")
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
    if (!path.includes("read-online")) {
      var url = window.location.href;
      var chapter = "";
    } else {
      var url = window.location.origin;
      var title = path.split("/")[2].split("-");
      chapter = title[title.length - 3];
      title = title.slice(0, title.length - 4).join("-");
      url = `${url}/manga/${title}`;
    }
    return await $.ajax(url).then((res) => {
      const html = $($.parseHTML(res));
      const name = html.find("div.BoxBody h1").html();
      const img = html.find("div.BoxBody > div > div > img").attr("src");
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

const getInfo = {
  0: readm,
  1: asura,
  2: reaper,
  3: kakalot,
  4: kakalot,
  5: mangasee,
}

const getManhwaInfo = async (url) => {
  const origin = window.location.hostname;
  const type = [
    "readm",
    "asura",
    "reaperscans",
    "mangakakalot",
    "readmanganato",
    "mangasee123"
  ];
  const option = type.filter((item, index) => {
    if (origin.includes(item)) {
      if (item === "readm" && origin.includes("readmanganato"))
        return false
      if (item === "reaperscans" && origin.includes("asura"))
        return false
      if (item === "asura" && origin.includes("reaperscans"))
        return false
      return item;
    } else
      return false
  })[0];

  const path = window.location.pathname;
  const index = type.indexOf(option);
  // console.log(getInfo[index])
  return await getInfo[index](path);

}
