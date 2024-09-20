import { db } from '../firebaseConfig'; // Already importing db
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";

// Function to create a new resume
export const createNewResume = async (data) => {
    try {
        // Ensure 'data' is a plain object
        if (typeof data !== 'object' || data === null) {
            throw new Error('Data must be a plain object');
        }
  
        const docRef = await addDoc(collection(db, "user-resumes"), data);
        return { id: docRef.id, ...data };  // Return the new document ID and data
    } catch (error) {
        console.error("Error creating new resume:", error);
        throw error;
    }
};

// Function to get a resume by user email
export const GetUserResume = async (userEmail) => {
    try {
        // Ensure email is a string
        if (typeof userEmail !== 'string') {
            throw new Error('Email must be a string');
        }
  
        const q = query(
            collection(db, 'user-resumes'),
            where('email', '==', userEmail)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error fetching user resume:', error);
        throw error;
    }
};

// Function to update resume details by ID
export const UpdateResumeDetail = async (id, data) => {
    try {
        const resumeRef = doc(db, "user-resumes", id);
        await updateDoc(resumeRef, data);
        return { id, ...data };  // Return the updated document ID and data
    } catch (error) {
        console.error("Error updating resume:", error);
        throw error;
    }
};
// Function to get a resume by ID
export const GetResumeById = async (id) => {
    try {
        // Ensure 'id' is a string
        // if (typeof id !== 'string') {
        //     throw new Error('ID must be a string');
        // }
  
        const resumeRef = doc(db, "user-resumes", id);
        const resumeSnapshot = await getDoc(resumeRef);
        if (resumeSnapshot?.exists()) {
            return { id: resumeSnapshot?.id, ...resumeSnapshot.data() };  // Return the document ID and data
        } else {
            throw new Error("Resume not found");
        }
    } catch (error) {
        console.error("Error fetching resume by ID:", error);
        throw error;
    }
};

// Function to delete a resume by ID
export const DeleteResumeById = async (id) => {
    try {
        // Ensure 'id' is a string
        // if (typeof id !== 'string') {
        //     throw new Error('ID must be a string');
        // }
  
        const resumeRef = doc(db, "user-resumes", id);
        await deleteDoc(resumeRef);
    } catch (error) {
        console.error("Error deleting resume:", error);
        throw error;
    }
};

export default {
    createNewResume,
    GetUserResume,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById,
};
