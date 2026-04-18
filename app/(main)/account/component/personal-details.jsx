'use client';
import { updateUserInfo } from '@/app/actions/account';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { toast } from 'sonner';

const PersonalDetails = ({userInfo}) => {
    const [infoState, setInfoState] = React.useState({
        firstName: userInfo?.firstName || '',
        lastName: userInfo?.lastName || '',
        email: userInfo?.email || '',
        designation: userInfo?.designation || '',
       bio : userInfo?.bio || ''
    })

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInfoState((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleUpdate = async(e) => {
		e.preventDefault();	
		// Here you can handle the form submission, e.g., send the data to an API or update the state
		try {
		await updateUserInfo(userInfo?.email,infoState);
		toast.success('User information updated successfully!');
		} catch (error) {
			toast.error('Failed to update user information.');
		}
	};


  return (
   		<div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
				<h5 className="text-lg font-semibold mb-4">Personal Detail :</h5>
				<form onSubmit={handleUpdate}>
					<div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
						<div>
							<Label className="mb-2 block">
								First Name : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								placeholder="First Name:"
								id="firstName"
								name="firstName"
								required
								onChange={handleChange}
                                value={infoState?.firstName}
							/>
						</div>
						<div>
							<Label className="mb-2 block">
								Last Name : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="text"
								placeholder="Last Name:"
								id="lastName"
								name="lastName"
								required
								onChange={handleChange}	
                                value={infoState?.lastName}
							/>
						</div>
						<div>
							<Label className="mb-2 block">
								Your Email : <span className="text-red-600">*</span>
							</Label>
							<Input
								type="email"
								placeholder="Email"
								name="email"
								disabled
								required
                                value={infoState?.email}
							/>
						</div>
						<div>
							<Label className="mb-2 block">Occupation :</Label>
							<Input
								name="designation"
								id="designation"
								type="text"
								placeholder="Occupation :"
                                value={infoState?.designation}
                                onChange={handleChange}	
							/>
						</div>
					</div>
					{/*end grid*/}
					<div className="grid grid-cols-1">
						<div className="mt-5">
							<Label className="mb-2 block">Description :</Label>
							<Textarea
								id="bio"
								name="bio"
								placeholder="Message :"	
                                value={infoState?.bio}
                                onChange={handleChange}
							/>
						</div>
					</div>
					{/*end row*/}
					<Button className="mt-5" asChild>
						<input type="submit" name="send" value="Save Changes" />
					</Button>
				</form>
				{/*end form*/}
			</div>
  )
}

export default PersonalDetails