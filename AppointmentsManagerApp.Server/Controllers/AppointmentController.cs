using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AppointmentsManagerApp.Server.Data;
using AppointmentsManagerApp.Server.Data.Models;

namespace AppointmentsManagerApp.Server.Controllers
{
    [Route("api/appointment")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/appointment - default
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            if (_context.Appointments == null)
            {
                return NotFound("No Data Found!");
            }

            return await _context.Appointments.Where(e => !e.Deleted && !e.Done).ToListAsync();
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            if(_context.Appointments == null) 
            { 
                return NotFound("No Data Found!");
            }

            var appointment = await _context.Appointments.FindAsync(id);

            if(appointment == null)
            {
                return NotFound();
            }

            return appointment;
        }

        [HttpPost("filters")]
        public async Task<ActionResult<IEnumerable<Appointment>>> FilteredAppointments(Filter filters)
        {
            if (_context.Appointments == null)
            {
                return NotFound("No Data Found!");
            }

            List<Appointment> allData = await _context.Appointments.ToListAsync();

            if (filters.All)
            {
                return allData;
            }

            if (filters.LevelOfImportance != null)
            {
                allData = allData.Where(e => e.LevelOfImportance == filters.LevelOfImportance).ToList();
            }

            if (filters.SpecifiedDate != null)
            {
                allData = allData.Where(e => e.Date == filters.SpecifiedDate).ToList();
            }

            if (filters.StartDate != null && filters.EndDate != null) 
            {
                allData = allData.Where(e => e.Date >= filters.StartDate && e.Date <= filters.EndDate).ToList();
            }

            allData = allData.Where(e => e.Done == filters.Done).ToList();
            allData = allData.Where(e => e.Deleted == filters.Deleted).ToList();

            return allData;
        }

        // PUT: api/Appointment/5
        [HttpPost]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.ID)
            {
                return BadRequest("You are trying to modify the wrong appointment.");
            }

            //_context.Entry(appointment).State = EntityState.Modified;

            try
            {
                Appointment entry_ = await _context.Appointments.FirstAsync(e => e.ID == appointment.ID);

                if (entry_.Title != appointment.Title)
                {
                    entry_.Title = appointment.Title;
                }

                if (entry_.Description != appointment.Description)
                {
                    entry_.Description = appointment.Description;
                }

                if (entry_.Address != appointment.Address)
                {
                    entry_.Address = appointment.Address;
                }

                if (entry_.LevelOfImportance != appointment.LevelOfImportance)
                {
                    entry_.LevelOfImportance = appointment.LevelOfImportance;
                }

                if (entry_.Done != appointment.Done)
                {
                    entry_.Done = appointment.Done;
                }

                if (entry_.Deleted != appointment.Deleted)
                {
                    entry_.Deleted = appointment.Deleted;
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id))
                {
                    return NotFound("The appointment with the Id" + " " + id + " does not exist!");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Appointment updated successfully!");
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            if (_context.Appointments == null)
            {
                return Problem("Entity set 'AppDbContext Appointments' is null.");
            }

            try
            {
                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();
            } catch (DbUpdateConcurrencyException e)
            {
                return BadRequest("Could not create the new Appointment: " + e.Message);
            }

            return CreatedAtAction("GetAppointment", new { id = appointment.ID }, appointment);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            if (_context.Appointments == null)
            {
                return NotFound("No Data Found!");
            }

            Appointment appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
            {
                return NotFound("No appointment with the ID " + id );
            }

            appointment.ModifiedDate = DateTime.Now;
            appointment.Deleted = true;
            await _context.SaveChangesAsync();

            return Ok("Appointment deleted successfully.");
        }

        private bool AppointmentExists(int id)
        {
            return (_context.Appointments?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
