import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { STORIES } from "../../utils/consts";
import Story from "../Story/Story";

function Stories(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState();
  const [file, setFile] = useState("");
  const params = useParams();
  const prodId = params.id;

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    STORIES.find((item) => {
      if (item.link.toLowerCase() === prodId.slice(1)) {
        setName(item.name);
        setLink(item.link);
        setFile(item.file);
        const poster = require(`../../assets/imgs/${item.link}.jpg`);
        setImage(poster.default);
        props.setHeaderText(item.name);
      }
    });
  }, [link, prodId, props]);

  return (
    <Story
      name={name}
      link={link}
      image={image}
      file={file}
      setHeaderText={props.setHeaderText}
    />
  );
}

export default Stories;
