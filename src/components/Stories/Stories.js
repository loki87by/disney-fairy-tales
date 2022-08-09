// ***импорты
import React from "react";
import {useParams} from 'react-router-dom'
import { STORIES } from '../../utils/consts';
import Story from "../Story/Story";
import "./Stories.css";

// ***функционал
function Stories() {
  // **стейты
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')
  const [image, setImage] = React.useState()
  const [file, setFile] = React.useState('')
    const params = useParams();
    const prodId = params.id;

  React.useEffect(() => {
    // eslint-disable-next-line array-callback-return
    STORIES.find((item) => {
      if (item.link.toLowerCase() === prodId.slice(1)) {
        setName(item.name)
        setLink(item.link)
        setFile(item.file)
        const poster = require(`../../assets/imgs/${item.link}.jpg`)
        setImage(poster.default)
      }
    })
}, [link, prodId])
  // **DOM
  return (
    <Story name={name} link={link} image={image} file={file}/>
  );
}

// ***экспорт
export default Stories;
