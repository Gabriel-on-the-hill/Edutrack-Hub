import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    SCOPES
);

const calendar = google.calendar({ version: 'v3', auth });

/**
 * Creates a Google Meet event
 * @param {Object} params
 * @param {string} params.title
 * @param {string} params.description
 * @param {Date} params.startTime
 * @param {number} params.durationMinutes
 * @returns {Promise<string|null>} Meet URL or null if failed
 */
export async function createMeeting({ title, description, startTime, durationMinutes }) {
    // Graceful skip if no credentials
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        console.log('[GoogleCall] Credentials missing, skipping Meet creation');
        return null;
    }

    // Graceful skip if no calendar ID
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    if (!calendarId) {
        console.log('[GoogleCall] GOOGLE_CALENDAR_ID missing, skipping Meet creation');
        return null;
    }

    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

    try {
        const res = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: {
                summary: title,
                description: description,
                start: { dateTime: startTime.toISOString() },
                end: { dateTime: endTime.toISOString() },
                conferenceData: {
                    createRequest: {
                        requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(7)}`,
                        conferenceSolutionKey: { type: 'hangoutsMeet' },
                    },
                },
            },
            conferenceDataVersion: 1,
        });

        const meetLink = res.data.conferenceData?.entryPoints?.find(
            (entry) => entry.entryPointType === 'video'
        )?.uri;

        if (meetLink) {
            console.log(`[GoogleCall] Created meeting: ${meetLink}`);
        } else {
            console.warn('[GoogleCall] Event created but no meeting link returned');
        }

        return meetLink || null;
    } catch (error) {
        console.error('[GoogleCall] Failed to create meeting:', error.message);
        return null;
    }
}
