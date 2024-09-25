export default function BannerTitle( title ) {
  const titleArray = title.split(' ');
  
  let words = [];
  for (let i = 0; i < titleArray.length; i++) {
    words[words.length] = titleArray[i].split('');
    words[words.length - 1].push(' ');
  }
  
  const letter = item => {
    return item.map(( l, index ) => <span className={`title-letter`} key={index}>{l}</span>)
  }
  
  const letters = () => {
    return words.map(( word, index ) => <span className="title-word" key={index}>{letter(word)}</span>)
  }
  
  return (<h1 className={`banner__title`}>{letters()}</h1>)
}