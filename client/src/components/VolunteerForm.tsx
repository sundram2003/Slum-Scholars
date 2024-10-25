import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { useToast, Toast } from './ui/use-toast';

interface VolunteerFormData {
  fullName: string;
  currentAddress: string;
  permanentAddress: string;
  aadharNumber: string;
  phoneNumber: string;
  activity: string;
  dateOfBirth: string;
  qualification: string;
  otherQualifications: string;
  email: string;
}

const VolunteerForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast, showToast } = useToast();
  const [formData, setFormData] = useState<VolunteerFormData>({
    fullName: '',
    currentAddress: '',
    permanentAddress: '',
    aadharNumber: '',
    phoneNumber: '',
    activity: '',
    dateOfBirth: '',
    qualification: '12th Pass',
    otherQualifications: '',
    email: '',
  });

  const activities = ['Marketing', 'Management', 'Teaching', 'Technical'];
  const qualifications = ['12th Pass', '10th Pass', 'Graduate', 'Post Graduate'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.activity) {
      showToast({
        title: 'Error',
        description: 'Please select an activity.',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      console.log('Submitting form data:', formData); 
      
      const response = await fetch('http://localhost:4000/api/volunteer', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); 
      console.log('Response:', data); 

      if (response.ok) {
        showToast({
          title: 'Success!',
          description: 'Your volunteer application has been submitted successfully.',
        });
        setIsOpen(false);
        setFormData({
          fullName: '',
          currentAddress: '',
          permanentAddress: '',
          aadharNumber: '',
          phoneNumber: '',
          activity: '',
          dateOfBirth: '',
          qualification: '12th Pass',
          otherQualifications: '',
          email: '',
        });
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error); 
      showToast({
        title: 'Error',
        description: error.message || 'There was an error submitting your application. Please try again.',
        variant: 'destructive',
      });
    }
};
  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
      >
        Apply Now
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Volunteer Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Full Name</label>
                <Input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Current Address</label>
                <Input
                  required
                  value={formData.currentAddress}
                  onChange={(e) => setFormData({...formData, currentAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Permanent Address</label>
                <Input
                  required
                  value={formData.permanentAddress}
                  onChange={(e) => setFormData({...formData, permanentAddress: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Aadhar Number</label>
                <Input
                  required
                  pattern="[0-9]{12}"
                  value={formData.aadharNumber}
                  onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Phone Number</label>
                <Input
                  required
                  pattern="[0-9]{10}"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Activity</label>
                <Select
                  value={formData.activity}
                  onValueChange={(value) => setFormData({...formData, activity: value})}
                >
                  {activities.map((activity) => (
                    <Select.Option key={activity} value={activity}>
                      {activity}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block mb-1">Date of Birth</label>
                <Input
                  required
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Qualification</label>
                <Select
                  value={formData.qualification}
                  onValueChange={(value) => setFormData({...formData, qualification: value})}
                >
                  {qualifications.map((qual) => (
                    <Select.Option key={qual} value={qual}>
                      {qual}
                    </Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block mb-1">Other Qualifications</label>
                <Input
                  value={formData.otherQualifications}
                  onChange={(e) => setFormData({...formData, otherQualifications: e.target.value})}
                />
              </div>

              <div>
                <label className="block mb-1">Email</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <Toast toast={toast} />
    </>
  );
};

export default VolunteerForm;