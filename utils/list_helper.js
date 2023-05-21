const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  
  function amount(item){
    return item.likes;
  }
  
  function sum(prev, next){
    return prev + next;
  }
  return blogs.map(amount).reduce(sum) ;
}

module.exports = {
  dummy,
  totalLikes
}