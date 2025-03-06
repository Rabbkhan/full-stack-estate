import './list.scss';
import Card from "../card/Card";
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
function List({ posts, loading }) {
  if (loading) {
    return <div className="loading"><LoadingSkeleton/></div>;
  }

  return (
    <div className='list'>
      {posts?.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;
