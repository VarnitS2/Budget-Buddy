from db_worker import Worker

if __name__ == '__main__':
    db = Worker('api/data.db')
    
    if len(db.select_all_transactions()) == 0:
        with open('api/data.csv') as file:
            for line in file:
                rstrip = line.rstrip()

                transaction = {
                    "user_email": 'varnits02@gmail.com',
                    "date": '20'+rstrip.split(',')[1].split('/')[2]+'-'+rstrip.split(',')[1].split('/')[0]+'-'+rstrip.split(',')[1].split('/')[1],
                    "description": rstrip.split(',')[4],
                    "type": rstrip.split(',')[2],
                    "amount": rstrip.split(',')[3],
                }

                db.add_to_transactions(transaction)
    else:
        for elem in db.select_all_transactions():
            print(tuple(elem))

