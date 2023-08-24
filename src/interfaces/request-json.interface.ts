import { Profile } from './profile.interface';

export interface RequestJson {
    candidates: Profile[],
    user: Profile
}
