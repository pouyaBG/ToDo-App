import style from '../../../view/style/LoadinPage.module.scss';

const LoadingPage = () => {
  return (
    <>
      <div className={style.main}>
        <div className={style.loader}>
          <svg viewBox='0 0 80 80'>
            <circle id='test' cx='40' cy='40' r='32'></circle>
          </svg>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
