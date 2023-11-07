import React from 'react';
import styles from "../styles/Note.module.css";
import { Note as NoteModel } from '../models/note';
import { Card } from 'react-bootstrap';
import { formatDate } from '../utils/formatDate';
import {MdDelete} from 'react-icons/md';
import styleUtils from '../styles/utils.module.css';
interface NoteProps{
    note: NoteModel,
    onDeleteNoteClicked:(note:NoteModel)=>void,
    className?:string
}

const Notes = ({ note,className,onDeleteNoteClicked }: NoteProps) => {
    const {title,text,createdAt,updatedAt} = note;
    let createdUpdatedText:string="";
    if(updatedAt>createdAt){
        createdUpdatedText=  "Updated at " + formatDate(updatedAt);
    }else{
      if(createdAt){
        createdUpdatedText=  "Created at " + formatDate(createdAt);
      }
    }
    return (
        <div>
            <Card className={`${styles.noteCard} ${className}`}>
                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styleUtils.flexCenter}>
                        {title}
                        <MdDelete className='text-muted ms-auto '
                        onClick={(e)=>{
                            onDeleteNoteClicked(note);
                            e.stopPropagation();
                        }}
                        />
                    </Card.Title>
                    <Card.Text className={styles.cardText}>{text}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    {createdUpdatedText}
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Notes;