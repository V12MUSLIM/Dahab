import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save, X, Mail, Phone, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CONTACT } from "@/config/SiteConfig";
import { Spinner } from "@/components/ui/spinner";
//TODO: Use for API Updating the contacts
//import api from "@/api/axios";
//import { useMutation } from "@tanstack/react-query";

export default function AdminEditContact() {
  const [email, setEmail] = useState(CONTACT?.email || "");
  const [phone, setPhone] = useState(CONTACT?.phone || "");
  const [isSuccess, setIsSuccess] = useState(false);

  // const handleContactsUpdate = async ()=>{
  //   const newContact = await api.put('/contacts', { email, phone });
  //   return newContact;
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API here
    setTimeout(() => setIsSuccess(false), 6000);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-950 dark:to-black p-4 transition-colors duration-200">
      <Card className="w-full max-w-md shadow-xl border-gray-200 dark:border-zinc-800 dark:bg-zinc-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 pb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Edit Contact Information
            </CardTitle>
          </div>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Update your site's contact details. Changes will be reflected across
            the platform.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@dahab-resort.com"
                  className="h-11 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+20 123 456 7890"
                  className="h-11 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex gap-3 pt-6">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium transition-all shadow-sm hover:shadow-md"
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Updated!
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            variant="outline"
            type="button"
            className="flex-1 h-11 dark:bg-zinc-800 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-700 transition-all"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
