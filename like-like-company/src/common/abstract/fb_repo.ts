import {firebaseDatabaseRepository} from '../../lib/index';

export abstract class FirebaseDatabase{
    protected firebaseDB = firebaseDatabaseRepository;
};
