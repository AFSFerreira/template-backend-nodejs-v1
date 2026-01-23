import { transporterOptions } from '@constants/email-configuration-constants'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport(transporterOptions)
