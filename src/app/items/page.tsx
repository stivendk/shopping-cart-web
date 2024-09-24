'use client';

import React, { useEffect, useState } from 'react';
import { Item } from '../models/item.model';
import { getAllItems } from '../services/item.service';
import styles from '../styles/item-list.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { CurrencyFormatter } from '../shared/format-currency';

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItems();
                setItems(data);
            } catch (err) {
                setError('Error fetching items');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleWatchClick = (item: Item) => {
        if (item.status !== 'UNAVAILABLE') {
            router.push(`/items/${item.id}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={styles.itemList}>
            {items.map(item => (
                <div key={item.id} className={styles.item}>
                    <img src={item.urlImage} alt={item.name} loading='lazy' />
                    <div className={styles.overlay}>
                        <div className={styles.detailsWrapper}>
                            <div className={styles.firstRow}>
                                <span className={styles.itemName}>{item.name}</span>
                                <span className={styles.itemPrice}>${CurrencyFormatter.formatCurrency(item.price)}</span>
                            </div>
                            <div className={styles.secondRow}>
                                <button className={`${item.status === 'UNAVAILABLE' ? styles.disabledButton : styles.watchButton}`} onClick={() => handleWatchClick(item)}>
                                    {item.status === 'UNAVAILABLE' ? 'Out of stock' : 'Watch'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemList;