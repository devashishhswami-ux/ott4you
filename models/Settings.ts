import mongoose, { Schema, Model } from 'mongoose';

export interface ISettings {
    _id: string;
    maintenanceMode: boolean;
    maintenanceMessage: string;
}

const SettingsSchema = new Schema<ISettings>({
    maintenanceMode: {
        type: Boolean,
        default: false,
    },
    maintenanceMessage: {
        type: String,
        default: 'We are currently performing maintenance. Please check back soon!',
    },
});

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);

export default Settings;
