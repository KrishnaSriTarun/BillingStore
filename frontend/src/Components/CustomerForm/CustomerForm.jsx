import './CustomerForm.css'
function CustomerForm() {
      return (
            <div className="p-3">
                  <div className="mb-3">
                        <div className="d-flex align-items-center gap-2">
                              <label htmlFor="customerName" className='col-4'>Customer name</label>
                              <input type="text" className='form-control form-control-sm' id="customerName" />
                        </div>
                  </div>
                  <div className="mb-3">
                        <div className="d-flex align-items-center gap-2">
                              <label htmlFor="mobileNumber" className='col-4'>Mobile number</label>
                              <input type="text" className='form-control form-control-sm' id="mobileNumber" />
                        </div>
                  </div>
            </div>
      );
}

export default CustomerForm;