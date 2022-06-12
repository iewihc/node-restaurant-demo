import { db } from '../models/firebase.config';
import {Restaurant} from "../models/restaurant.interface";
const COLLECTION = 'restaurant';

export const findAll = async (): Promise<Restaurant[]> => {
    return await findAllRestaurant()
};

export const create = async (newItem: Restaurant): Promise<Restaurant> => {
    let result = await createRestaurant(newItem);
    return newItem;
};

export const find = async (id: string): Promise<Restaurant> => {
    return await getRestaurantById(id);
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
    const allEntries: Restaurant[] = []
    const snapshot = await db.collection(COLLECTION).get();
    snapshot.forEach((doc: any) => allEntries.push(doc.data()))
    return allEntries;
};

const createRestaurant = async (req:Restaurant) => {
    let docRef = db.collection(COLLECTION).doc();
    let setDoc = docRef.set({
        body: req
    }).then((r)=> {
        console.log({ message: 'Restaurant Inserted Successfully' });
    }).catch((error)=>{
        console.log({ error:error , message: 'Restaurant not inserted' });
    });
};

const getRestaurantById = async (id:string)=>{
    let result : any = {}
    db.collection(COLLECTION).doc(id).get().then((doc) => {
        if (!doc.exists) {
            console.log({ message: 'No such document!' });
        } else {
            result = doc.data()
        }
    }).catch(error => {
        console.log(error)
    });
    return result;
};

const deleteRestaurantById = async (id:string)=>{
    db.collection(COLLECTION).doc(id).get().then((snapshot) => {
        if (!snapshot.exists) {
            console.log({message: 'Restaurant Not Found'});
        } else {
            let docRef = db.collection(COLLECTION).doc(id);
            docRef.delete().then(() => {
                console.log({message: 'Restaurant Deleted Successfully'});
            }).catch(() => {
                console.log({message: 'Restaurant Not Deleted'});
            });
        }
    });
}

const putRestaurant = async(id:string, req:Restaurant)=>{
    db.collection(COLLECTION).doc(id).get().then((snapshot) => {
        if (!snapshot.exists) {
            console.log({message: 'Restaurant Not Found'});
        } else {
            let docRef = db.collection('restaurant').doc(id);
            docRef.update({
                body: req
            }).then(() => {
                console.log({message: 'RestaurantInfo Updated Successfully'});
            }).catch(() => {
                console.log({message: 'RestaurantInfo Not Updated'});
            });
        }
    });
};
