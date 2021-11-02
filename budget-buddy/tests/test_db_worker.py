import unittest
import context
import hashlib

from api import db_worker

class TestDatabaseWorkerMethods(unittest.TestCase):
    def setUp(self) -> None:
        self.db_w = db_worker.Worker(':memory:')
        self.db_w.create_tables()

    def tearDown(self) -> None:
        self.db_w.close_connection()

    def test_create_initial_and_select_all_tables(self) -> None:
        tables = self.db_w.select_all_tables()

        self.assertEqual(tuple(tables[0])[0], 'users')
        self.assertEqual(tuple(tables[1])[0], 'transactions')

    def test_add_to_users_and_select_all_users(self) -> None:
        user = {
            'email': 'varnits02@gmail.com',
            'password': hashlib.sha224(b"testPassword 1").hexdigest(),
            'username': 'varnits2',
            'balance': 0.0
        }

        self.db_w.add_to_users(user)
        users = self.db_w.select_all_users()

        self.assertEqual(len(users), 1)
        self.assertEqual(tuple(users[0])[0], 1)
        self.assertEqual(tuple(users[0])[1], user['email'])
        self.assertEqual(tuple(users[0])[2], user['password'])
        self.assertEqual(tuple(users[0])[3], user['username'])
        self.assertEqual(tuple(users[0])[4], user['balance'])

    def test_select_from_users(self) -> None:
        user = {
            'email': 'varnits02@gmail.com',
            'password': hashlib.sha224('testPassword 1'.encode('ascii')).hexdigest(),
            'username': 'varnits2',
            'balance': 0.0
        }

        self.db_w.add_to_users(user)

        user = {
            'email': 'varnits2@illinois.edu',
            'password': hashlib.sha224(b"testPassword 2").hexdigest(),
            'username': 'varnits3',
            'balance': 0.0
        }

        self.db_w.add_to_users(user)

        users = self.db_w.select_all_users()
        self.assertEqual(len(users), 2)

        users = self.db_w.select_from_users(user['email'])

        self.assertEqual(len(users), 1)
        self.assertEqual(tuple(users[0])[0], 2)
        self.assertEqual(tuple(users[0])[1], user['email'])
        self.assertEqual(tuple(users[0])[2], user['password'])
        self.assertEqual(tuple(users[0])[3], user['username'])
        self.assertEqual(tuple(users[0])[4], user['balance'])

    def test_update_user_balance(self) -> None:
        user = {
            'email': 'varnits02@gmail.com',
            'password': hashlib.sha224('testPassword 1'.encode('ascii')).hexdigest(),
            'username': 'varnits2',
            'balance': 0.0
        }

        self.db_w.add_to_users(user)

        users = self.db_w.select_all_users()
        self.assertEqual(len(users), 1)
        self.assertEqual(tuple(users[0])[4], user['balance'])

        new_balance = 50.00
        self.db_w.update_user_balance(user['email'], new_balance)

        users = self.db_w.select_all_users()
        self.assertEqual(len(users), 1)
        self.assertEqual(tuple(users[0])[4], new_balance)

    def test_delete_user(self) -> None:
        user = {
            'email': 'varnits02@gmail.com',
            'password': hashlib.sha224('testPassword 1'.encode('ascii')).hexdigest(),
            'username': 'varnits2',
            'balance': 0.0
        }

        self.db_w.add_to_users(user)

        users = self.db_w.select_all_users()
        self.assertEqual(len(users), 1)

        self.db_w.delete_from_users(user['email'])

        users = self.db_w.select_all_users()
        self.assertEqual(len(users), 0)

    def test_add_to_transactions_and_select_all_transactions(self) -> None:
        transaction = {
            'user_email': 'varnits02@gmail.com',
            'description': 'Starbucks',
            'type': '-',
            'amount': 10.47
        }

        self.db_w.add_to_transactions(transaction)
        transactions = self.db_w.select_all_transactions()

        self.assertEqual(len(transactions), 1)
        self.assertEqual(tuple(transactions[0])[0], 1)
        self.assertEqual(tuple(transactions[0])[1], transaction['user_email'])
        self.assertEqual(tuple(transactions[0])[3], transaction['description'])
        self.assertEqual(tuple(transactions[0])[4], transaction['type'])
        self.assertEqual(tuple(transactions[0])[5], transaction['amount'])

    def test_select_from_transactions(self) -> None:
        transaction_one = {
            'user_email': 'varnits02@gmail.com',
            'description': 'Starbucks',
            'type': '-',
            'amount': 10.47
        }

        self.db_w.add_to_transactions(transaction_one)

        transaction_two = {
            'user_email': 'varnits02@gmail.com',
            'description': 'Target',
            'type': '-',
            'amount': 12.40
        }

        self.db_w.add_to_transactions(transaction_two)

        transactions = self.db_w.select_all_transactions()
        self.assertEqual(len(transactions), 2)

        transactions = self.db_w.select_from_transactions(transaction_one['user_email'])

        self.assertEqual(len(transactions), 2)

        self.assertEqual(tuple(transactions[0])[0], 1)
        self.assertEqual(tuple(transactions[0])[1], transaction_one['user_email'])
        self.assertEqual(tuple(transactions[0])[3], transaction_one['description'])
        self.assertEqual(tuple(transactions[0])[4], transaction_one['type'])
        self.assertEqual(tuple(transactions[0])[5], transaction_one['amount'])

        self.assertEqual(tuple(transactions[1])[0], 2)
        self.assertEqual(tuple(transactions[1])[1], transaction_two['user_email'])
        self.assertEqual(tuple(transactions[1])[3], transaction_two['description'])
        self.assertEqual(tuple(transactions[1])[4], transaction_two['type'])
        self.assertEqual(tuple(transactions[1])[5], transaction_two['amount'])

    def test_delete_transaction(self) -> None:
        transaction = {
            'user_email': 'varnits02@gmail.com',
            'description': 'Starbucks',
            'type': '-',
            'amount': 10.47
        }

        self.db_w.add_to_transactions(transaction)
        transactions = self.db_w.select_all_transactions()

        self.assertEqual(len(transactions), 1)

        self.db_w.delete_from_transactions(tuple(transactions[0])[0])

        transactions = self.db_w.select_all_transactions()
        self.assertEqual(len(transactions), 0)

if __name__ == '__main__':
    unittest.main()