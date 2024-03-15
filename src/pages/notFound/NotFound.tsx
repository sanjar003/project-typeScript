import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; // импортируем стили из модульного CSS файла

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.title}>404 - Страница не найдена</h1>
            <p className={styles.description}>Извините, запрошенная страница не найдена.</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
};

export default NotFound;
