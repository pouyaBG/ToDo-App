import Panel from '../Dashboard/Panel';
import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <Panel />
      <div className='page-404'>
        <div className='page-404'>
          <div className='div-main'>
            <div className='number'>404</div>
            <div className='text'>
              <span>متاسفیم...</span>
              <br></br>صفحه مورد نظر یافت نشد
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
