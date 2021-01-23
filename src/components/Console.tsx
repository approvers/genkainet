import React, { FC } from "react";

import styles from "./Console.module.scss";

const Console: FC = ({ children }) => <div className={styles.console}>{children}</div>;

export default Console;
