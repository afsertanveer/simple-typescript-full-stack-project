import React from 'react';
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from '../models/note';
import { Card } from 'react-bootstrap';

interface NoteProps{
    note: NoteModel,
    className?:string
}

const Notes = ({ note,className }: NoteProps) => {
    const {title,text,createdAt,updatedAt} = note;
    return (
        <div>
            <Card className={`${styles.noteCard} ${className}`}>
                <Card.Body className={styles.cardBody}>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text className={styles.cardText}>{text}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Notes;