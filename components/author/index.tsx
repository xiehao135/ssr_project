/**
 * 
 * wlijun
 * 作者信息模块
 */
import {
     FC
} from "react"
import styles from "./styles.module.scss";
export interface IAuthorProps {
  name: string;
  job: string;
  address: string;
}
export const Author: FC<IAuthorProps> = ({ name, job, address })=>{

     return (
          <div className={ styles.authorBox }>
               <div className={ styles.authorContent }>
                    <div className={ styles.authorImg }>
                         {/* <img src="/uploads/f44d305ea48e246a61a00e_0d6d1a5594.jpg?updated_at=2023-02-12T08:00:18.456Z" alt="" /> */}
                    </div>
                    <div className={ styles.authorDesc }>
                         <div className = {styles.authorName}>
                         { name }
                         </div>
                         <div className = {styles.authorInfo}>
                            <span>{ job }</span>
                            <span> { address } </span>  
                         </div>
                         
                    </div>
               </div>
          </div>
     )
}