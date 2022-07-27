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

        <div class={`${style.loader} ${style.triangle}`}>
          <svg viewBox='0 0 86 80'>
            <polygon points='43 8 79 72 7 72'></polygon>
          </svg>
        </div>

        <div class={style.loader}>
          <svg viewBox='0 0 80 80'>
            <rect x='8' y='8' width='64' height='64'></rect>
          </svg>
        </div>
      </div>
    </>
  );
};

export default LoadingPage;
