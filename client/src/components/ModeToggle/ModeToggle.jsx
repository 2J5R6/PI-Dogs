// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleMode } from '../../redux/actions/modeActions';
// import styles from './ModeToggle.module.css';

// const ModeToggle = () => {
//   const dispatch = useDispatch();
//   const darkMode = useSelector(state => state.mode.darkMode);

//   const handleToggle = () => {
//     dispatch(toggleMode());
//   };

//   return (
//     <div className={styles.toggleContainer}>
//       <label className={styles.switch}>
//         <input type="checkbox" checked={darkMode} onChange={handleToggle} />
//         <span className={styles.slider}></span>
//       </label>
//       <p>{darkMode ? 'Modo Oscuro' : 'Modo Claro'}</p>
//     </div>
//   );
// };

// export default ModeToggle;
