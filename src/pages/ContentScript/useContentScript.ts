import $ from 'jquery';

const readm = async (path: string) => {
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

const asura = async (path: string) => {
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
      var url: string | undefined = window.location.href;
      var chapter = "";
    } else {
      var url: string | undefined = $("div.allc a").attr("href");
      chapter = path.replace(/[^0-9]/g, "");
    }
    return await $.ajax(url || '').then((res) => {
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

const reaper = async (path: string) => {
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
      var chapter: string | string[] = "";
    } else {
      // Página do capitulo
      var url = window.location.origin;
      url = `${url}${path.split("/").splice(0, 3).join("/")}`;
      var chapter: string | string[] = path.split('/')
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

const kakalot = async (path: string) => {
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

const mangasee = async (path: string) => {
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
      var title: string | string[] = path.split("/")[2].split("-");
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

const getInfo: Record<number, Function> = {
  0: readm,
  1: asura,
  2: reaper,
  3: kakalot,
  4: kakalot,
  5: mangasee,
}

export const getManhwaInfo = async (url?: string) => {
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
