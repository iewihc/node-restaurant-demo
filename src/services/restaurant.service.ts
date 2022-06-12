import { firebaseSettings } from '../models/firebase.config';
import {Restaurant} from "../models/restaurant.interface";
const _db = firebaseSettings.firestore();
const COLLECTION = 'restaurant';

export const findAll = async (): Promise<Restaurant[]> => {
    let result : Restaurant[] = await findAllRestaurant()
    console.log(result)
    return Object.values(result)
};

export const create = async (newItem: Restaurant): Promise<Restaurant> => {
    let result = await createRestaurant(newItem);
    return newItem;
};

export const find = async (id: string): Promise<Restaurant> => {
    let result : Restaurant = await getRestaurantById(id);
    console.log(result)
    return result;
};

export const remove = async (id: string): Promise<null | void> => {
    return await deleteRestaurantById(id);
};

export const update = async (
    id: string,
    itemUpdate: Restaurant
): Promise<any | null> => {
    const item = await find(id);

    if (!item) {
        return null;
    }

    return await putRestaurant(id,itemUpdate);
};

// db impl

const findAllRestaurant = async () => {
    const snapshot = await _db.collection(COLLECTION).get();
    return snapshot.docs.map((doc: { data: () => any; }) => doc.data());
};

const createRestaurant = async (body:Restaurant) => {
    let docRef = _db.collection(COLLECTION).doc();
    console.log(body)
    let setDoc = docRef.set({
        name: body.name,
        address: body.address,
        price: body.price,
        description: body.description
    }).then((r)=> {
        console.log('writeResult===' , r)
        let resultAddRestaurant = { message: 'Restaurant Inserted Successfully' };
    }).catch((error)=>{
        console.log(error);
        let resultAddRestaurant = { message: 'Restaurant not inserted' };
    });
};

const getRestaurantById = async (id:string)=>{
    let result : any = {}
    _db.collection(COLLECTION).doc(id).get().then((doc) => {
        if (!doc.exists) {
            let resultGetRestaurantById = { message: 'No such document!' };
        } else {
            result = doc.data()
            console.log(doc.data())
        }
    }).catch(error => {
        console.log(error)
    });
    console.log(result)
    return result;
};

const deleteRestaurantById = async (id:string)=>{
    _db.collection(COLLECTION).doc(id).get().then((snapshot) => {
        if (snapshot.exists) {
            let docRef = _db.collection(COLLECTION).doc(id);
            docRef.delete().then(()=> {
                let resultDeleteRestaurantById = { message: 'Restaurant Deleted Successfully' };
                return resultDeleteRestaurantById;
            }).catch(()=>{
                let resultDeleteRestaurantById = { message: 'Restaurant Not Deleted' };
                return resultDeleteRestaurantById;
            });
        } else {
            let resultDeleteRestaurantById = { message: 'Restaurant Not Found' };
            return resultDeleteRestaurantById;
        }
    });
}

const putRestaurant = async(id:string,body:Restaurant)=>{
    _db.collection(COLLECTION).doc(id).get().then((snapshot) => {
        if (snapshot.exists) {
            let docRef = _db.collection('restaurant').doc(id);
            docRef.update({
                name: body.name,
                address: body.address,
                price: body.price,
                description: body.description
            }).then(()=> {
                let resultUpdateRestaurant = { message: 'RestaurantInfo Updated Successfully' };
                return resultUpdateRestaurant;
            }).catch(()=>{
                let resultUpdateRestaurant = { message: 'RestaurantInfo Not Updated' };
                return resultUpdateRestaurant;
            });
        } else {
            let resultUpdateRestaurant = { message: 'Restaurant Not Found' };
            return resultUpdateRestaurant;
        }
    });
};
