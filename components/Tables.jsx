import Image from "next/image";
import css from "../styles/Tables.module.css";
import PoolTable from "../assets/PoolTable.png";
import { useState } from "react";
import { useStore } from "../store/store";

export default function Tables() {
    const tables = [
        { number: 1, icon: PoolTable, status: "" },
        { number: 2, icon: PoolTable, status: "booked" },
        { number: 3, icon: PoolTable, status: "booked" },
        { number: 4, icon: PoolTable, status: "" },
    ];

    const [selectedTable, setSelectedTable] = useState(null);
    const addTable = useStore((state) => state.addTable);
    const cartTables = useStore((state) => state.cart.tables || []);
    console.log(cartTables)

    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedTable(value);
        addTable(value); // Save table number to Zustand
    };

    return (
        <div className={css.container}>
            <div className={css.heading}>
                <div>AVAILABLE TABLES</div>
                <div>Select a Table</div>
            </div>

            <div className={css.tableGrid}>
                {tables.map((table) => (
                    <div className={css.table} key={table.number}>
                        <div className={css.imageWrapper}>
                            <Image
                                src={table.icon}
                                alt={`Table ${table.number}`}
                                width={100}
                                height={100}
                            />
                        </div>

                        <div className={css.tableInfo}>
                            {table.status === "" ? (
                                <label className={css.radioLabel}>
                                    <input
                                        type="radio"
                                        name="table"
                                        value={table.number}
                                        onChange={handleChange}
                                        checked={cartTables === String(table.number)}
                                    />
                                    Select Table {table.number}
                                </label>
                            ) : (
                                <span className={css.bookedText}>Booked</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {selectedTable && (
                <div className={css.selectionMessage}>
                    You selected: Table {selectedTable}
                </div>
            )}
        </div>
    );
}
