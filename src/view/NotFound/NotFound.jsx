import style from '../style/NotFound.module.scss';

const NotFound = () => {
  return (
    <>
      <div className={style.page_404}>
        <div className={style.page_404}>
          <div className={style.div_main}>
            <div className={style.number}>404</div>
            <div className={style.text}>
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
