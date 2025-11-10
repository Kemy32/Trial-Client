import {
  Phone,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Github,
} from "lucide-react";
export default function HeaderBar() {
  return (
    <>
      <div className="w-full bg-dark-gray text-white py-2 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            <Phone size={14} />
            <span>(+49) 01573 - 4698845</span>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <Mail size={14} />
            <span>owner@bistrobliss</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <a
            href="#"
            className="p-1 bg-mid-gray rounded-full hover:bg-crimson transition-colors"
          >
            <Twitter size={14} />
          </a>
          <a
            href="#"
            className="p-1 bg-mid-gray rounded-full hover:bg-crimson transition-colors"
          >
            <Facebook size={14} />
          </a>
          <a
            href="#"
            className="p-1 bg-mid-gray rounded-full hover:bg-crimson transition-colors"
          >
            <Instagram size={14} />
          </a>
          <a
            href="#"
            className="p-1 bg-mid-gray rounded-full hover:bg-crimson transition-colors"
          >
            <Github size={14} />
          </a>
        </div>
      </div>
    </>
  );
}
