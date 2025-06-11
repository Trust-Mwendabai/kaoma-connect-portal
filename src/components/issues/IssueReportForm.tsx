
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Camera, AlertTriangle } from "lucide-react";

interface IssueReportFormProps {
  onSave: () => void;
  onCancel: () => void;
}

const IssueReportForm = ({ onSave, onCancel }: IssueReportFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    location: "",
    priority: "medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-xl">
            <Plus className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Report an Issue</h1>
            <p className="text-gray-600">Help us identify and resolve community issues</p>
          </div>
        </div>
        <Button variant="outline" onClick={onCancel} className="hover:scale-105 transition-all duration-300">
          Cancel
        </Button>
      </div>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Issue Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief description of the issue"
                  className="h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Where is this issue located?"
                  className="h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-orange-500 transition-all duration-300"
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Roads">Roads</option>
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-orange-500 transition-all duration-300"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Detailed Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Provide detailed information about the issue, including any safety concerns or impact on the community..."
                rows={8}
                className="text-lg border-2 focus:border-orange-500 transition-all duration-300"
                required
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Photo Upload (Optional)
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Adding photos helps us understand and prioritize the issue better.
              </p>
              <Button type="button" variant="outline" className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Submit Issue Report
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="px-8 h-12 text-lg hover:scale-105 transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueReportForm;
