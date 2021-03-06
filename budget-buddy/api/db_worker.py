import sqlite3

# Worker class for database operations
class Worker():
    # Connect to provided database, initialize row factory, create cursor
    def __init__(self, db_name) -> None:
        self._con = sqlite3.connect(db_name, check_same_thread=False)
        self._con.row_factory = sqlite3.Row
        self._cur = self._con.cursor()

    # Create Users and Transactions tables
    def create_tables(self) -> None:
        self._cur.execute('''CREATE TABLE users (
                            user_id INTEGER PRIMARY KEY,
                            email TEXT NOT NULL UNIQUE,
                            password TEXT NOT NULL,
                            username TEXT NOT NULL,
                            balance FLOAT
                            );''')

        self._cur.execute('''CREATE TABLE transactions (
                            transaction_id INTEGER PRIMARY KEY,
                            user_email TEXT NOT NULL,
                            date DATE DEFAULT CURRENT_DATE,
                            description TEXT NOT NULL,
                            type VARCHAR(2) NOT NULL,
                            amount FLOAT NOT NULL,
                            FOREIGN KEY (user_email) REFERENCES users(email)
                            );''')
        self._con.commit()

    # Select all tables from the database
    def select_all_tables(self) -> list:
        self._cur.execute('''SELECT name FROM sqlite_master WHERE type="table";''')
        return self._cur.fetchall()

    # Add a record to the users table
    def add_to_users(self, user) -> None:
        self._cur.execute('''INSERT INTO users (email, password, username, balance) VALUES
                            (:email, :password, :username, :balance);''', user)
        self._con.commit()

    # Select all users in the database
    def select_all_users(self) -> list:
        self._cur.execute('''SELECT * FROM users;''')
        return self._cur.fetchall()

    # Select user with the provided email in the database
    def select_from_users(self, user_email) -> list:
        self._cur.execute('''SELECT * FROM users
                            WHERE email = ?;''', (user_email,))
        return self._cur.fetchall()

    # Update the balance of the user with the provided email
    def update_user_balance(self, user_email, balance) -> None:
        self._cur.execute('''UPDATE users
                            SET balance = ?
                            WHERE email = ?;''', (balance, user_email))
        self._con.commit()

    # Delete the user with the provided user_email from the database
    def delete_from_users(self, user_email) -> None:
        self._cur.execute('''DELETE FROM users WHERE email=?;''', (user_email,))
        self._con.commit()

    # Add a record to the transactions table
    def add_to_transactions(self, transaction) -> None:
        self._cur.execute('''INSERT INTO transactions (user_email, date, description, type, amount) VALUES
                            (:user_email, :date, :description, :type, :amount);''', transaction)
        self._con.commit()

    # Select all transactions in the database
    def select_all_transactions(self) -> list:
        self._cur.execute('''SELECT * FROM transactions;''')
        return self._cur.fetchall()

    # Select transaction with the provided user email from the database
    def select_from_transactions(self, user_email) -> list:
        self._cur.execute('''SELECT * FROM transactions
                            WHERE user_email = ?;''', (user_email,))
        return self._cur.fetchall()

    # Select transaction between the provided dates with the provided user email from the database
    def select_from_transactions_between_dates(self, user_email, start_date, end_date) -> list:
        self._cur.execute('''SELECT * FROM transactions
                            WHERE user_email = ? AND date >= ? AND date <= ?;''', (user_email, start_date, end_date))
        return self._cur.fetchall()

    # Delete the transaction with the provided transaction_id from the database
    def delete_from_transactions(self, transaction_id) -> None:
        self._cur.execute('''DELETE FROM transactions WHERE transaction_id=?;''', (transaction_id,))
        self._con.commit()

    # Close connection to the database
    def close_connection(self) -> None:
        self._con.close()